"use client";
import { Content, KeyTextField } from "@prismicio/client";
import { useEffect, useRef } from "react";
import { SliceComponentProps } from "@prismicio/react";
import { Span } from "next/dist/trace";
import { gsap } from "gsap";
import Bounded from "@/components/Bounded";
import Shapes from "./Shapes";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
	const component = useRef(null);

	useEffect(() => {
		const tl = gsap.timeline();

		tl.fromTo(
			".name-animation",
			{
				x: -100,
				opacity: 0,
				rotate: -40,
			},
			{
				x: 0,
				opacity: 1,
				rotate: 0,
				ease: "elastic.out(1,0.5)",
				duration: 1,
				transformOrigin: "top left",
				stagger: {
					each: 0.1,
				},
			}
		);

		tl.fromTo(
			".job-title",
			{
				y: 30,
				opacity: 0,
				scale: 1.2,
			},
			{
				y: 0,
				opacity: 1,
				scale: 1,
				ease: "power4.inOut",
				duration: 1,
				transformOrigin: "bottom",
			}
		);

		let ctx = gsap.context(() => {}, component);
		return () => ctx.revert();
	}, []);

	const renderLetters = (
		name: KeyTextField,
		key: string
	): JSX.Element[] | undefined => {
		if (!name) return;

		return name.split("").map((letter, index) => (
			<span
				key={index}
				className={`name-animation name-animation-${key} inline-block opacity-1`}
			>
				{letter}
			</span>
		));
	};

	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			ref={component}
		>
			<div className="min-h-[70vh] grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 items-center">
				<div className="col-start-1 md:row-start-1">
					<h1
						className="font-extrabold text-[clamp(3rem,20vmin,20rem)] mb-8 leading-none tracking-tighter "
						aria-label={slice.primary.first_name + "" + slice.primary.last_name}
					>
						<span className="block text-slate-300 ">
							{renderLetters(slice.primary.first_name, "first")}
						</span>
						<span className="-mt-[.2em] block text-slate-500 w-full">
							{renderLetters(slice.primary.last_name, "last")}
						</span>
					</h1>
					<span className="job-title font-bold block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl">
						{slice.primary.tag_line}
					</span>
				</div>
				<Shapes />
			</div>
		</Bounded>
	);
};

export default Hero;

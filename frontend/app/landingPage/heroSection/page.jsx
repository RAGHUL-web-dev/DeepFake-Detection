import Image from "next/image";
import Link from "next/link";
import DeepfakeRealitySection from "../DeepFakeReality/page";
import LandingServices from "../Intro/page";
import ServiceIntro from "../serviceIntro/page";
import heroBg2 from "../../../assests/heroimg2.png";
import heroBg from "../../../assests/heroimg.png";

function HeroSection() {
    return (
        <>
        <section className="relative min-h-screen w-full overflow-hidden bg-[var(--color-dark)]">
      
            {/* Background Image (Perfect Fit) */}
            <Image
                src={heroBg2}
                alt="Deepfake Detection"
                fill
                priority
                className="object-cover object-center"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/40" />

            {/* Content */}
            <div className="relative z-10 flex min-h-screen items-center">
                <div className="mx-auto w-full max-w-7xl px-6">
                    <div className="max-w-2xl">

                        <h1 className="text-4xl font-extrabold text-[var(--color-light)] md:text-5xl lg:text-6xl">
                            Verify Digital Media.
                            <br />
                            <span className="text-[var(--color-primary-light)]">
                                Defend the Truth.
                            </span>
                        </h1>

                        <p className="mt-6 text-lg text-[var(--color-light-gray)]">
                            An AI-powered deepfake detection platform with
                            <span className="text-[var(--color-light)]">
                                {" "}blockchain-backed provenance tracking
                            </span>,
                            built for transparency and trust.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                href="/verify"
                                className="rounded-lg bg-[var(--color-primary)] px-8 py-4 text-white font-semibold hover:bg-[var(--color-primary-dark)]"
                            >
                                Verify Media Now
                            </Link>

                            <Link
                                href="/how-it-works"
                                className="text-sm text-[var(--color-light-gray)] hover:text-white"
                            >
                                Learn how verification works →
                            </Link>
                        </div>

                        <p className="mt-6 text-sm text-[var(--color-light-gray)]">
                            Verification results are immutable and blockchain-anchored.
                        </p>

                    </div>
                </div>
            </div>
        </section>

        <DeepfakeRealitySection />
        <LandingServices />
        <ServiceIntro />
        </>
    );
}

export default HeroSection;
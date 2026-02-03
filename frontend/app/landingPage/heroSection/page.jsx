import Link from "next/link";
import DeepfakeRealitySection from "../DeepFakeReality/page";

function HeroSection() {
    return (
        <>
        <section className="relative min-h-screen w-full overflow-hidden bg-[var(--color-dark)]">
      
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                backgroundImage:
                    "url('/images/hero-bg.jpg')", // replace with your image
                }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/40" />

            {/* Content */}
            <div className="relative z-10 flex min-h-screen items-center">
                <div className="mx-auto w-full max-w-7xl px-6">
                <div className="max-w-2xl">

                    {/* Main Heading */}
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[var(--color-light)] md:text-5xl lg:text-6xl">
                    Verify Digital Media.
                    <br />
                    <span className="text-[var(--color-primary-light)]">
                        Defend the Truth.
                    </span>
                    </h1>

                    {/* Sub Heading */}
                    <p className="mt-6 text-lg leading-relaxed text-[var(--color-light-gray)]">
                    An AI-powered deepfake detection platform with
                    <span className="text-[var(--color-light)]">
                        {' '}blockchain-backed provenance tracking
                    </span>
                    , built for transparency, trust, and real-world verification.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-10 flex flex-wrap items-center gap-4">

                    {/* Primary CTA */}
                    <Link
                        href="/verify"
                        className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
                    >
                        Verify Media Now
                    </Link>

                    {/* Secondary CTA */}
                    <Link
                        href="/how-it-works"
                        className="text-sm font-medium text-[var(--color-light-gray)] transition-colors hover:text-[var(--color-light)]"
                    >
                        Learn how verification works →
                    </Link>
                    </div>

                    {/* Trust Micro Text */}
                    <p className="mt-6 text-sm text-[var(--color-light-gray)]">
                    Verification results are immutable and blockchain-anchored.
                    </p>

                </div>
                </div>
            </div>
        </section>

        <DeepfakeRealitySection />
        </>
        
    );
}

export default HeroSection;
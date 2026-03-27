import SolutionPreview from "./solutionPreview/page";

function SolutionPage() {
    return (
        <main className="w-full bg-[#161616]">
            
            {/* Hero Section with YouTube Video */}
            <section className="relative w-full h-[90vh] overflow-hidden">
                
                {/* YouTube Video Background */}
                <iframe
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    src="https://www.youtube.com/embed/WzK1MBEpkJ0?autoplay=1&mute=1&loop=1&playlist=WzK1MBEpkJ0&controls=0&modestbranding=1&rel=0&showinfo=0&start=5&end=15"
                    title="Deepfake Example - Bill Gates"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Optional Content on top */}
                <div className="relative z-10 flex items-center justify-center h-full">
                    <h1 className="text-white text-4xl md:text-6xl font-light tracking-wide text-center px-4">
                        Detect the Undetectable
                    </h1>
                </div>
            </section>

            {/* Scroll Indicator */}
            <section className="w-full h-[10vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                        <span className="animate-scroll w-1 h-2 bg-white rounded-full mt-2" />
                    </div>
                    <p className="text-white text-xs tracking-widest uppercase">
                        Scroll
                    </p>
                </div>
            </section>

            {/* Context & Impact Section */}
            <section className="w-full py-24 px-6 md:px-20 bg-[#161616] text-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-start">

                    {/* Left */}
                    <div className="md:w-1/2 space-y-8">
                        <h2 className="text-4xl md:text-5xl font-light leading-tight">
                            The Boundary Between <br />
                            <span className="text-primary font-medium">
                                Reality and Fabrication
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400 font-light leading-relaxed">
                            As generative AI becomes more accessible, the distinction between authentic and synthetic media is eroding.
                            Deepfakes are no longer just a novelty—they are a vector for misinformation, fraud, and reputational damage.
                            Our mission is to restore trust in digital content through rigorous, AI-powered analysis.
                        </p>
                    </div>

                    {/* Right */}
                    <div className="md:w-1/2 grid gap-10">
                        <div className="space-y-3">
                            <h3 className="text-2xl font-normal border-l-2 border-primary pl-4">
                                Preserving Truth
                            </h3>
                            <p className="text-gray-400 text-sm pl-4">
                                Verifiable authenticity is the ultimate currency in a synthetic media world.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-2xl font-normal border-l-2 border-primary pl-4">
                                Enterprise Security
                            </h3>
                            <p className="text-gray-400 text-sm pl-4">
                                Protect organizations from impersonation and fraud using AI detection.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-2xl font-normal border-l-2 border-primary pl-4">
                                Digital Identity
                            </h3>
                            <p className="text-gray-400 text-sm pl-4">
                                Safeguard individuals from unauthorized media manipulation.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            <SolutionPreview />
        </main>
    );
}

export default SolutionPage;
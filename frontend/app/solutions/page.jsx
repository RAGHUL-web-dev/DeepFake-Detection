import SolutionPreview from "./solutionPreview/page";

function SolutionPage() {
    return (
        <>
            <main className="w-full bg-[#161616]">
                {/* 90% height: Image / Video */}
                <section className="w-full h-[90vh]">
                    <video
                        className="w-full h-full object-cover"
                        src="../../public/SolutionVideo.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                </section>

                {/* 10% height: Scroll Indicator */}
                <section className="w-full h-[10vh] flex items-center justify-center ">
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

                        {/* Left: Headline & Intro */}
                        <div className="md:w-1/2 space-y-8">
                            <h2 className="text-4xl md:text-5xl font-light leading-tight">
                                The Boundary Between <br />
                                <span className="text-primary font-medium">Reality and Fabrication</span>
                            </h2>
                            <p className="text-lg text-gray-400 font-light leading-relaxed">
                                As generative AI becomes more accessible, the distinction between authentic and synthetic media is eroding.
                                Deepfakes are no longer just a novelty—they are a vector for misinformation, fraud, and reputational damage.
                                Our mission is to restore trust in digital content through rigorous, AI-powered analysis.
                            </p>
                        </div>

                        {/* Right: Key Pillars */}
                        <div className="md:w-1/2 grid gap-10">
                            <div className="space-y-3">
                                <h3 className="text-2xl font-normal text-white border-l-2 border-primary pl-4">Preserving Truth</h3>
                                <p className="text-gray-400 text-sm pl-4 leading-relaxed">
                                    In an information ecosystem saturated with synthetic facsimiles, verifiable authenticity is the ultimate currency. We provide the tools to validate what is real.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-2xl font-normal text-white border-l-2 border-primary pl-4">Enterprise Security</h3>
                                <p className="text-gray-400 text-sm pl-4 leading-relaxed">
                                    From executive impersonation to fraudulent directives, deepfakes pose a tangible threat to corporate integrity. Our detection layer serves as a critical shield.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-2xl font-normal text-white border-l-2 border-primary pl-4">Digital Identity</h3>
                                <p className="text-gray-400 text-sm pl-4 leading-relaxed">
                                    Your likeness is your signature. We help protect individuals from unauthorized synthesis and non-consensual media manipulation.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                <SolutionPreview/>
            </main>


        </>
    );
}

export default SolutionPage;
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col gap-6">
                <section className="bg-gray-50 p-6 rounded-lg">
                    <h1 className="text-4xl font-bold mb-8 text-gray-800">About ResumeGenie</h1>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Open Source Project</h2>
                    <p className="text-gray-700 leading-relaxed">
                        ResumeGenie is an open-source project dedicated to helping people create professional resumes with ease. 
                        We believe in the power of community-driven development and welcome contributions from developers worldwide.
                    </p>
                </section>

                <section className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Our mission is to provide a free, accessible, and powerful tool for resume creation. 
                        By making ResumeGenie open source, we ensure transparency, continuous improvement, 
                        and the ability for anyone to contribute to making resume creation better for everyone.
                    </p>
                </section>

                <section className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contribute</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        We welcome contributions from the community! Whether you're a developer, designer, 
                        or documentation writer, your input can help make ResumeGenie even better. 
                        Visit our GitHub repository to learn more about how you can contribute.
                    </p>
                    <div className="mt-3 flex justify-between">
                        <a 
                            href="https://github.com/A-r-y-a-n-123/ResumeGenie" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                        >
                            GitHub
                        </a>
                        <button 
                            onClick={() => navigate('/upload')}
                            className="inline-flex items-center px-6 py-3 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition-colors duration-200 shadow-sm"
                        >
                            Visit App
                        </button>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default About;
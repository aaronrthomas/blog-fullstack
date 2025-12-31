import Link from 'next/link';
import Head from 'next/head';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="description" content="The requested page could not be found." />
      </Head>
      
      <div className="min-h-screen flex items-center justify-center p-8 bg-gray-100">
        <div className="text-center max-w-md mx-auto p-12 bg-white rounded-lg shadow-md border border-gray-100">
          <h1 className="text-8xl md:text-9xl font-black text-black mb-2 leading-none tracking-tighter">
            404
          </h1>
          <div className="w-16 h-1 bg-black mx-auto mb-8"></div>
          <h2 className="text-2xl md:text-3xl font-light text-black mb-6 tracking-wide">
            Page Not Found
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10 font-light">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Link 
            href="/" 
            className="inline-block px-8 py-3 bg-black text-white font-medium rounded-none hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all duration-200 uppercase tracking-wider text-sm"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </>
  );
}
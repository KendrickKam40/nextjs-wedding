/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push('encoding', /* add any other modules that might be causing the error */);
        return config;
      },
      headers : ()=>{return [
        {
          source: '/:path*{/}?',
          headers: [
            {
              key: 'X-Accel-Buffering',
              value: 'no',
            },
          ],
        },
      ]}
};

export default nextConfig;
export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        sitemap: 'https://diy-nu.vercel.app/sitemap.xml',
    }
}
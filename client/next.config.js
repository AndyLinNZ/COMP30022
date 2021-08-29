module.exports = {
    async redirects() {
        return [
            {
                source: '/dashboard',
                destination: '/dashboard/teams',
                permanent: true,
            },
        ]
    },
}

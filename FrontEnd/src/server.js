const mode = 'production';
export const userServer = mode==='local' ? ('http://localhost:4000/api/v2/user') : ("https://socialmedia-1eyo.vercel.app/api/v2/user") ;
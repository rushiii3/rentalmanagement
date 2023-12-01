const production = true;
export const userServer = !production ? ('http://localhost:4000/api/v2/user') : ("https://rentalmanagement-cvrc.vercel.app/api/v2/user") ;
export const propertServer = !production ? ('http://localhost:4000/api/v2/property') : ("https://rentalmanagement-cvrc.vercel.app/api/v2/property") ;
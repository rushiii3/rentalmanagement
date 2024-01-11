const production = false;
export const userServer = !production ? ('http://localhost:4000/api/v2/user') : ("https://rentalmanagement-cvrc.vercel.app/api/v2/user") ;
export const propertServer = !production ? ('http://localhost:4000/api/v2/property') : ("https://rentalmanagement-cvrc.vercel.app/api/v2/property");
export const PhysicalVisitServer = !production ? ('http://localhost:4000/api/v2/physical-visit') : ("https://rentalmanagement-cvrc.vercel.app/api/v2/physical-visit");
export const VideoConferenceServer = !production ? ('http://localhost:4000/api/v2/video-conference') : ("https://rentalmanagement-cvrc.vercel.app/api/v2/video-conference");
export const PropertyBookingServer = !production ? ('http://localhost:4000/api/v2/property-booking') : ("https://rentalmanagement-cvrc.vercel.app/api/v2/property-booking");

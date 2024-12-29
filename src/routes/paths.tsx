export const RootPaths = { 
    landingRoot : "/",
    authRoot :"auth",
    adminRoot : "admin",
    errorRoot: "error",
} 

export default {
    landing: `/${RootPaths.landingRoot}`,
    dashboard: `/${RootPaths.adminRoot}`,
    login: `/${RootPaths.authRoot}/login`,
    signup: `/${RootPaths.authRoot}/sign-up`,
    404: `/${RootPaths.errorRoot}/404`,
  };
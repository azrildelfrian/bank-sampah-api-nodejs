function listRoutes(app) {
  const routes = [];

  if (!app || !app._router || !app._router.stack) {
    console.error('❌ Express app._router.stack tidak ditemukan.');
    return [];
  }

  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      const path = middleware.route.path;
      const methods = Object.keys(middleware.route.methods).join(', ').toUpperCase();
      routes.push({ path, methods });
    } else if (middleware.name === 'router' && middleware.handle.stack) {
      middleware.handle.stack.forEach((handler) => {
        const route = handler.route;
        if (route) {
          const path = route.path;
          const methods = Object.keys(route.methods).join(', ').toUpperCase();
          routes.push({ path, methods });
        }
      });
    }
  });

  return routes;
}

module.exports = listRoutes;

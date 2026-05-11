/**
 * Role-based authorization middleware
 * Restricts access based on user role
 */

/**
 * Allow only SUPER_ADMIN
 */
const requireSuperAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "SUPER_ADMIN") {
    return res.status(403).json({ 
      message: "Forbidden: Super Admin access required" 
    });
  }
  next();
};

/**
 * Allow only ADMIN or SUPER_ADMIN
 */
const requireAdmin = (req, res, next) => {
  if (!req.user || (req.user.role !== "ADMIN" && req.user.role !== "SUPER_ADMIN")) {
    return res.status(403).json({ 
      message: "Forbidden: Admin access required" 
    });
  }
  next();
};

/**
 * Allow specific roles
 * @param {...String} allowedRoles - Roles that are allowed
 */
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Forbidden: ${allowedRoles.join(" or ")} access required` 
      });
    }
    next();
  };
};

module.exports = {
  requireSuperAdmin,
  requireAdmin,
  requireRole
};

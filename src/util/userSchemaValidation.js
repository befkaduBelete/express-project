//  [
//     body("username")
//       .notEmpty()
//       .withMessage("Username cannot be empty")
//       .isLength({ min: 5, max: 32 })
//       .withMessage("The caracter min:5 and max:32")
//       .isString()
//       .withMessage("username must be character"),
//     body("displayname")
//       .notEmpty()
//       .withMessage("Usernem cannot be empty")
//       .isLength({ min: 5, max: 32 })
//       .withMessage("The caracter min:5 and max:32")
//       .isString()
//       .withMessage("displayname must be character"),
//     body("password")
//       .notEmpty()
//       .withMessage("password cannot be empty")
//       .isLength({ min: 5, max: 32 })
//       .withMessage("The caracter min:5 and max:32")
//       .isString()
//       .withMessage("password must be character"),
//   ]

export const userAddSchemaValidation = {
  username: {
    notEmpty: {
      errorMessage: "Username cannot be null",
    },
    isLength: {
      options: {
        min: 3,
        max: 20,
      },
      errorMessage: "Username must be between 3-20 characters",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
  },

  displayname: {
    notEmpty: {
      errorMessage: "Display name cannot be empty",
    },
    isString: {
      errorMessage: "Display name must be a string",
    },
  },

  password: {
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
  },
};

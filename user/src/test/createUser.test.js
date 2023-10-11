import { createUser } from "../controller/user.controller";


test('Creates user successfully', () => {
    expect(router.route('/user').post(userValidationMiddleware, createUser)).toBe(json({ message: "User Created Successfully" }))
});
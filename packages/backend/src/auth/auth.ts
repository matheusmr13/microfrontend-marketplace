import jwt from 'jsonwebtoken';

const SECRET = 'MY_COOL_SECRET'
class Auth {

	static validateToken(token:string) {
		try {
			const [_, accessToken] = token.split(' ');
			const jwtPayload = <any>jwt.verify(accessToken, SECRET);
			return jwtPayload;
		} catch (e) {
			return null;
		}
	}

	// static createToken(user) {
	// 	const token = jwt.sign({
	// 		id: user.id
	// 	}, SECRET, {
	// 		expiresIn: 10000
	// 	});
	// }

	// id: string;
	// constructor(token) {

	// }


}

export default Auth;
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import User from "../components/user";
export default async function fname() {
	const session = await getServerSession(authOptions);
	return (
		<div>
			<h1>Session server side rendered: </h1>
			<pre>{JSON.stringify(session, null, 2)}</pre>

			<h1>Client side rendered: </h1>
			<User />
		</div>
	);
}

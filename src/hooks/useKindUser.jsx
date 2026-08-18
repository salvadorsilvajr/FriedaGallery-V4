import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCollection } from "../hooks/useCollection";

export const useKindUser = () => {
	const { documents } = useCollection("UsersTestCss");
	const [admin, setAdmin] = useState(false);
	const [sameUser, setSameUser] = useState(false);
	const [regularUser, setRegularUser] = useState(false);

	const { user } = useAuthContext();
	useEffect(() => {
		if (user) {
			documents.forEach((userData) => {
				// console.log(userData);
				// console.log(user);
				userData.id === user.uid ? setSameUser(true) : "";
				userData.id === user.uid ? setRegularUser(userData) : "";
				userData.id === user.uid && userData.isAdmin === "1"
					? setAdmin(true)
					: "";
			});
		}
	}, [documents, user]);

	return { admin, sameUser, regularUser };
};

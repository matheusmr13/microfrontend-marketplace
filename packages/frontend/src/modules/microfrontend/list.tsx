import React from 'react';
import {
	useParams
  } from "react-router-dom";

function Details() {
	let { microfrontendId } = useParams();
	return <div>micro details {microfrontendId}</div>
}

export default Details;

import React from 'react';

import useAxios from 'axios-hooks';
import {
	useParams,
  } from "react-router-dom";

  import VersionForm from './form';

  
function VersionDetails () {
	let { versionId } = useParams();
	const [{ data : version, loading, error }, refetch] = useAxios(`/versions/${versionId}`);


	if (loading) return <div>loading</div>;

	return (
	<VersionForm version={version} />  
	);
  }

  export default VersionDetails
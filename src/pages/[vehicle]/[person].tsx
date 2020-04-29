import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { VehiclePerson } from "../../../api/VehiclePerson";
import { NextPageContext } from "next";

export interface PersonProps {
  ownersList?: VehiclePerson[];
}

const Person = ({ ownersList }: PersonProps) => {
  const [owners, setOwners] = useState(ownersList);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const response = await fetch(
        `http://localhost:4001/vehicles?ownersName=${router.query.person}&vehicle=${router.query.vehicle}`
      );
      const ownersList: VehiclePerson[] | undefined = await response.json();
      setOwners(ownersList);
    }

    if (ownersList?.length == 0) {
      loadData();
    }
  }, []);

  if (!owners?.[0]) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{owners[0].details}</h1>
    </div>
  );
};

export default Person;

export interface MyNextPageContext extends NextPageContext {
  query: {
    person: string;
    vehicle: string;
  };
}

Person.getInitialProps = async ({ query, req }: MyNextPageContext) => {
  if (!req) {
    return { ownersList: [] };
  }

  const response = await fetch(
    `http://localhost:4001/vehicles?ownersName=${query.person}&vehicle=${query.vehicle}`
  );
  const ownersList: VehiclePerson[] | undefined = await response.json();
  return { ownersList: ownersList };
};

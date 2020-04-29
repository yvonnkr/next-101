import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { VehiclePerson } from "../../api/VehiclePerson";

export interface ListProps {
  ownersList?: VehiclePerson[];
}

const List = ({ ownersList }: ListProps) => {
  return (
    <div>
      <Link href="/">
        <a>HOME</a>
      </Link>
      {ownersList?.map((p, i) => (
        <div key={i}>
          <Link as={`/${p.vehicle}/${p.ownerName}`} href="/[vehicle]/[person]">
            <a>
              Navigate to {p.ownerName}'s {p.vehicle}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default List;

List.getInitialProps = async () => {
  const response = await fetch("http://localhost:4001/vehicles");
  const ownersList: VehiclePerson[] | undefined = await response.json();

  return { ownersList: ownersList };
};

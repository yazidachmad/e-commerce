import { Fragment } from "react";
import CategorySection from "./_partials/CategorySection";
import Latestsection from "./_partials/Latestsection";



export default function Home() {
  return (
    <Fragment>
      <CategorySection />
      <Latestsection/>
    </Fragment>
  );
}

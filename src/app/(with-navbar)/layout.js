import Navbar from "@/components/Navbar";
import { Fragment } from "react";


export default function Aunthenticatedlayout({ children }) {
    return (
        <Fragment>
            <Navbar />
            {children}
        </Fragment>
    )
    
}
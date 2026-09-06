import type {Metadata} from "next";
import "./globals.css";
import "./mia.css";

export const metadata:Metadata={
 title:"Mia Fernandez | Invitaciones y Diseño Web",
 description:"Invitaciones digitales y páginas web delicadas, personalizadas y adaptadas a celulares.",
 keywords:["invitaciones digitales","diseño web","páginas web","Argentina"],
 authors:[{name:"Mia Fernandez"}],creator:"Mia Fernandez",
 icons:{icon:"/favicon.svg"},
 openGraph:{type:"website",locale:"es_AR",title:"Mia Fernandez | Invitaciones y Diseño Web",description:"Ideas bonitas convertidas en experiencias digitales únicas."},
 twitter:{card:"summary_large_image",title:"Mia Fernandez | Invitaciones y Diseño Web",description:"Ideas bonitas convertidas en experiencias digitales únicas."}
};

export default function Layout({children}:{children:React.ReactNode}){return <html lang="es"><head><style>{`:root{--sans:Arial,Helvetica,sans-serif;--serif:Georgia,'Times New Roman',serif}`}</style></head><body>{children}</body></html>}

"use client"
import Link from "next/link"
import {usePathname} from "next/navigation"

const Navigation = ({navLinks}: INavLinks) => {
    const pathname = usePathname()
    return(
            <nav>
                <ul>
                    <li>
                        {
                            navLinks.map( ({link, name}: INavLink, index: number) => {
                                    const isActive = pathname.endsWith(link)
                                    return (
                                        <li>
                                            <Link key={index} href={link}>{name} - {isActive && "X"}</Link>
                                        </li>
                                    )
                                }
                            )
                        }
                        
                    </li>
                </ul>
            </nav>
    )
}
export default Navigation
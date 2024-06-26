import { FC, Fragment, ReactNode } from 'react'
import { ProfileLayoutTypes, UserDTO } from '@/ts'
// import { Meta } from '@/data/Metas'
import { NavBar } from '../NavBar'

const PublicLayout: FC<ProfileLayoutTypes> = (props) => {
    const { children, title } = props

    return (
        <section className="">
            {/* <Meta title={title} /> */}

            <NavBar />

            <Fragment>
                {children}
            </Fragment>
        </section>
    )
}

export default PublicLayout
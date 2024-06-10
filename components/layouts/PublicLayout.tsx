import { FC, Fragment, ReactNode } from 'react'
import { ProfileLayoutTypes } from '@/ts'
import { Meta } from '@/data/Metas'
import { NavBar } from '../NavBar'

const PublicLayout: FC<ProfileLayoutTypes> = (props): ReactNode => {
    const { children, title } = props

    return (
        <section className="relative">
            <Meta title={title} />

            <NavBar />

            <Fragment>
                {children}
            </Fragment>
        </section>
    )
}

export default PublicLayout
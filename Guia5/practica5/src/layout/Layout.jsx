import { Outlet } from "react-router"
import Header from "../components/Header"
import Modal from "../components/Modal"
import { useAppStore } from "../store/useAppStore"
import { useEffect } from "react"
import Notification from "../components/Notification"

export default function Layout() {

    const loadFromStorage = useAppStore((state) => state.loadFromStorage)

    useEffect(() => {
        loadFromStorage()
    }, [])


    return (
        <>
            <Header />

            <main className="mx-auto container py-16">
                <Outlet />
            </main>
            <Notification />

            <Modal />
        </>
    )
}
'use client'

import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"

export default function CommonModal({modalTitle, mainContent, showButtons, buttonComponent, show, setShow, showModalTitle}) {

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className={"relative z-10"} onClose={setShow}>
                <Transition.Child as={Fragment} enter="ease-in-out duration-900" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration=500" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-gtray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-hidden">
                    <div className="fixed top-[-13px] inset-y-0 right-0 flex max-w-full pl-10 h-[70vh] mt-[3.8em] md:hidden">
                        <Transition.Child as={Fragment} enter="ease-in-out duration-900" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration=500" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <Dialog.Panel className={"w-screen max-w-md"}>
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div className="flex-l overflow-y-auto px-2 py-6 sm:px-6 h-full">
                                        {showModalTitle ? 
                                            <div className="flex items-star justify-between">
                                                <Dialog.Title>{modalTitle}</Dialog.Title>
                                            </div>
                                            :
                                            null
                                        }
                                        <div className="h-full flex align-center">
                                            {mainContent}
                                        </div>
                                        {showButtons ? <div className="border-t border-gray-300 px-4 py-6 sm:px-6">{buttonComponent}</div> : null}
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>

        </Transition.Root>
    )
}
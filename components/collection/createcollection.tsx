import { useState } from "react";
import tw from "tailwind-styled-components"
import { Icon } from '@iconify/react';
import { Button } from "@components/common/button";
import { Modal } from "@components/common/modal/Modal";
import { LaunchPad } from "@components/market/launchpad";


export const CreateCollection = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    const SectionWrap = tw.div`
        max-w-md p-6 bg-white rounded-lg border border-gray-200 dark:border-gray-700 shadow dark:bg-gray-800 
    `
    const SectionTitle = tw.h2`
        mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white
    `
    const SectionDescription = tw.p`
        pt-5 mb-3 font-normal text-gray-700 dark:text-gray-400 text-md
    `

    return (
        <>
            <SectionWrap>
                <SectionTitle>New Collcetion</SectionTitle>
                <SectionDescription>Wellcome! <br></br>Create your own NFT collection</SectionDescription>
                <Button onClick={() => { setIsOpenModal(true) }} color="blue" size="w-4/12" >
                    Go to Create
                    <Icon icon="iconamoon:enter" className="text-lg ml-2" />
                </Button>
            </SectionWrap>
            <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} width="20rem" height="1.5rem"><LaunchPad setIsOpenModal={setIsOpenModal} /></Modal>
        </>
    )
}


export const AddNewCollection = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    const SectionWrap = tw.div`
        flex flex-row-reverse pr-6 pb-6 rounded-lg
    `   

    return (
        <SectionWrap>
            <Button onClick={() => setIsOpenModal(true)} color="green" size="w-32" fontSize="lg" >
                <Icon icon="typcn:plus" className="text-xl mr-1" />
                새 컬렉션
            </Button>
            <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} width="20rem" height="1.5rem"><LaunchPad setIsOpenModal={setIsOpenModal} /></Modal>
        </SectionWrap>
    )
}
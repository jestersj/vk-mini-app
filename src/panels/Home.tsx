import {FC, useEffect, useState} from 'react';
import {
    Panel,
    PanelHeader,
    Group,
    NavIdProps,
    PanelSpinner,
    PanelHeaderButton, Title
} from '@vkontakte/vkui';
import {IPost} from "../types/IPost.ts";
import {getLatestNews} from "../helpers/getPosts.ts";
import {Icon28SwitchOutline} from "@vkontakte/icons";
import {PostCard} from "../components/PostCard.tsx";

export const Home: FC<NavIdProps> = ({id}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [reloadCounter, setReloadCounter] = useState(0)
    const [posts, setPosts] = useState<IPost[]>([])

    const getData = async () => {
        setIsLoading(true)
        const data = await getLatestNews()
        setPosts(data)
        setIsLoading(false)
    }
    useEffect(() => {
        getData()
        const interval = setInterval(getData, 60000)

        return () => clearInterval(interval)
    }, [reloadCounter]);

    const reload = () => {
        setReloadCounter(reloadCounter+1)
    }
    return (
        <Panel id={id}>
            <PanelHeader
                before={
                    <PanelHeaderButton
                        onClick={reload}
                        aria-label={'Перезагрузить'}
                    >
                        <Icon28SwitchOutline/>
                    </PanelHeaderButton>
                }
            >
                <Title>Главная</Title>
            </PanelHeader>
            {
                !isLoading
                ?
                    <Group>
                        {
                            posts.map(item =>
                                <PostCard item={item}/>
                            )
                        }
                    </Group>
                    :
                    <PanelSpinner size={'large'}>Идет загрузка...</PanelSpinner>
            }
        </Panel>
    );
};

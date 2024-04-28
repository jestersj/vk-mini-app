import {FC, useEffect, useState} from 'react';
import {
    Group,
    Header,
    IconButton,
    NavIdProps,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    PanelSpinner,
    Title
} from '@vkontakte/vkui';
import {useParams, useRouteNavigator} from '@vkontakte/vk-mini-apps-router';
import {IPost} from "../types/IPost.ts";
import {fetchOnePost} from "../http/postsApi.ts";
import {getComments} from "../helpers/getPosts.ts";
import {PostInfo} from "../components/PostInfo.tsx";
import {Comment} from "../components/Comment.tsx";
import {Icon28SwitchOutline} from "@vkontakte/icons";

export const PostPanel: FC<NavIdProps> = ({id}) => {
    const routeNavigator = useRouteNavigator();
    const param = useParams<'id'>()

    const [post, setPost] = useState<IPost | null>(null)

    const [comments, setComments] = useState<IPost[] | null>(null)

    useEffect(() => {
        const getData = async () => {
            const postData = await fetchOnePost(Number(param?.id))
            setPost(postData)
            if (postData.kids) {
                const commentsData = await getComments(postData.kids)
                setComments(commentsData)
            }
        }

        getData()
    }, []);

    const reloadComments = async () => {
        if (post?.kids) {
            setComments([])
            const commentsData = await getComments(post.kids)
            setComments(commentsData)
        }
    }
    return (
        <Panel id={id}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()}/>}
            >
                <Title level={'3'}>{post ? post.title : 'Новость'}</Title>
            </PanelHeader>
            {
                post
                    ?
                    <PostInfo item={post}/>
                    :
                    <PanelSpinner>Загрузка поста...</PanelSpinner>
            }
            <Group>
                <Header
                    aside={
                        <IconButton onClick={reloadComments}>
                            <Icon28SwitchOutline/>
                        </IconButton>
                    }
                >
                    Комментарии: {post?.descendants}
                </Header>
                {
                    comments?.map(comment =>
                        <Group mode={'plain'}>
                            <Comment comment={comment}/>
                        </Group>
                    )
                }
            </Group>
        </Panel>
    );
};

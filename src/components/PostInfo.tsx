import {IPost} from "../types/IPost.ts";
import {FC} from "react";
import {Group, Header, MiniInfoCell} from "@vkontakte/vkui";
import {timeConverter} from "../helpers/timeConverter.ts";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";

interface Props {
    item: IPost
}

export const PostInfo: FC<Props> = ({item}) => {
    const routeNavigator = useRouteNavigator();

    return (
        <Group
            mode={'plain'}
            header={
                <Header
                    mode={'primary'}
                    aside={timeConverter(item.time)}
                >
                    Автор: {item.by}
                </Header>
            }
            onClick={() => routeNavigator.push(`${item.id}`)}
        >
            <MiniInfoCell>
                <a href={item.url}>{item.url}</a>
            </MiniInfoCell>
        </Group>
    );
};
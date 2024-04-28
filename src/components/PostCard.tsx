import {IPost} from "../types/IPost.ts";
import {FC} from "react";
import {Group, Header, MiniInfoCell} from "@vkontakte/vkui";
import {timeConverter} from "../helpers/timeConverter.ts";
import {Icon24Up} from "@vkontakte/icons";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";

interface Props {
    item: IPost
}

export const PostCard: FC<Props> = ({item}) => {
    const routeNavigator = useRouteNavigator();

    return (
        <Group
            mode={'plain'}
            header={
                <Header
                    mode={'primary'}
                    aside={timeConverter(item.time)}
                >
                    {item.title}
                </Header>
            }
            onClick={() => routeNavigator.push(`${item.id}`)}
        >
            <MiniInfoCell>
                Автор: {item.by}
            </MiniInfoCell>
            <MiniInfoCell before={<Icon24Up/>}>
                {item.score}
            </MiniInfoCell>
        </Group>
    );
};
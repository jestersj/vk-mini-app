import {FC, useState} from "react";
import {IPost} from "../types/IPost.ts";
import {
    CellButton,
    Div,
    Group,
    Headline,
    Paragraph,
} from "@vkontakte/vkui";
import {getComments} from "../helpers/getPosts.ts";

interface Props {
    comment: IPost;
}

export const Comment: FC<Props> = ({comment}) => {
    const [isOpen, setIsOpen] = useState(false)

    const [nestedComments, setNestedComments] = useState<IPost[]>([])

    const loadComments = async () => {
        if (comment.kids) {
            const data = await getComments(comment.kids)
            setNestedComments(data)
        }
    }

    const toggleAccordion = () => {
        setIsOpen(!isOpen)
        if (comment.kids && nestedComments.length === 0) {
            loadComments()
        }
    }
    return (
        <>
            {
                comment.text &&
                <Div>
                    <Group mode={'plain'}>
                        <Headline weight={'1'} level={'2'}>
                            {comment.by}
                        </Headline>
                        <Paragraph>
                            {comment.text}
                        </Paragraph>
                        {
                            comment.kids &&
                            <CellButton onClick={toggleAccordion}>
                                {isOpen ? 'Скрыть' : 'Показать'} ответы
                            </CellButton>
                        }
                    </Group>
                    {
                        isOpen && nestedComments &&
                        nestedComments.map(item =>
                            <Group mode={'plain'}>
                                <Comment comment={item}/>
                            </Group>
                        )
                    }
                </Div>
            }
        </>
    );
};

import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Box, List, ListItem, Flex, Text, Spacer } from '@chakra-ui/react';
import Layout from './components/layout'

//const { Box, List, ListItem, Flex, Text, Spacer } = require('@chakra-ui/react')

const Access: NextPage = ({ items }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Layout
            title="アクセスランキング | 2chまとめのアンテナ"
            description="2chまとめのアンテナのアクセスランキングです。"
            flexFlg={false}
        >
            <Box
                maxW="100%"
                marginLeft="3rem"
                marginRight="3rem"
            >
                <List>
                    <ListItem>
                        <Text fontWeight="bold">アクセスランキング</Text>
                    </ListItem>
                    <ListItem
                        borderTop="1px solid silver"
                        borderLeft="1px solid silver"
                        borderRight="1px solid silver"
                    >
                        <Flex>
                            <Box bg="gold" w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                <Text>1</Text>
                            </Box>
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                <Text>{items[0].name}</Text>
                            </Box>
                            <Spacer />
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                <Text>{items[0].count} アクセス</Text>
                            </Box>
                        </Flex>
                    </ListItem>
                    <ListItem
                        borderTop="1px solid silver"
                        borderLeft="1px solid silver"
                        borderRight="1px solid silver"
                    >
                        <Flex>
                            <Box bg="silver" w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                <Text>2</Text>
                            </Box>
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                <Text>{items[1].name}</Text>
                            </Box>
                            <Spacer />
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                <Text>{items[1].count} アクセス</Text>
                            </Box>
                        </Flex>
                    </ListItem>
                    <ListItem
                        borderTop="1px solid silver"
                        borderLeft="1px solid silver"
                        borderRight="1px solid silver"
                    >
                        <Flex>
                            <Box bg="brown" w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                <Text>3</Text>
                            </Box>
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                <Text>{items[2].name}</Text>
                            </Box>
                            <Spacer />
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                <Text>{items[2].count} アクセス</Text>
                            </Box>
                        </Flex>
                    </ListItem>
                    <ListItem
                        borderTop="1px solid silver"
                        borderLeft="1px solid silver"
                        borderRight="1px solid silver"
                    >
                        <Flex>
                            <Box w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                <Text>4</Text>
                            </Box>
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                <Text>{items[3].name}</Text>
                            </Box>
                            <Spacer />
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                <Text>{items[3].count} アクセス</Text>
                            </Box>
                        </Flex>
                    </ListItem>
                    <ListItem
                        borderTop="1px solid silver"
                        borderLeft="1px solid silver"
                        borderRight="1px solid silver"
                    >
                        <Flex>
                            <Box w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                <Text>5</Text>
                            </Box>
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                <Text>{items[4].name}</Text>
                            </Box>
                            <Spacer />
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                <Text>{items[4].count} アクセス</Text>
                            </Box>
                        </Flex>
                    </ListItem>
                    <ListItem
                        borderTop="1px solid silver"
                        borderLeft="1px solid silver"
                        borderRight="1px solid silver"
                    >
                        <Flex>
                            <Box w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                <Text>6</Text>
                            </Box>
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                <Text>{items[5].name}</Text>
                            </Box>
                            <Spacer />
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                <Text>{items[5].count} アクセス</Text>
                            </Box>
                        </Flex>
                    </ListItem>
                    <ListItem
                        borderTop="1px solid silver"
                        borderLeft="1px solid silver"
                        borderRight="1px solid silver"
                    >
                        <Flex>
                            <Box w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                <Text>7</Text>
                            </Box>
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                <Text>{items[6].name}</Text>
                            </Box>
                            <Spacer />
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                <Text>{items[6].count} アクセス</Text>
                            </Box>
                        </Flex>
                    </ListItem>
                    <ListItem
                        borderTop="1px solid silver"
                        borderLeft="1px solid silver"
                        borderRight="1px solid silver"
                    >
                        <Flex>
                            <Box w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                <Text>8</Text>
                            </Box>
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                <Text>{items[7].name}</Text>
                            </Box>
                            <Spacer />
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                <Text>{items[7].count} アクセス</Text>
                            </Box>
                        </Flex>
                    </ListItem>
                    <ListItem
                        borderTop="1px solid silver"
                        borderLeft="1px solid silver"
                        borderRight="1px solid silver"
                    >
                        <Flex>
                            <Box w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                <Text>9</Text>
                            </Box>
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                <Text>{items[8].name}</Text>
                            </Box>
                            <Spacer />
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                <Text>{items[8].count} アクセス</Text>
                            </Box>
                        </Flex>
                    </ListItem>
                    <ListItem
                        borderTop="1px solid silver"
                        borderLeft="1px solid silver"
                        borderRight="1px solid silver"
                    >
                        <Flex>
                            <Box w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                <Text>10</Text>
                            </Box>
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                <Text>{items[9].name}</Text>
                            </Box>
                            <Spacer />
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                <Text>{items[9].count} アクセス</Text>
                            </Box>
                        </Flex>
                    </ListItem>
                    <ListItem
                        borderTop="1px solid silver"
                        borderLeft="1px solid silver"
                        borderRight="1px solid silver"
                    >
                        <Flex>
                            <Box w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                <Text>11</Text>
                            </Box>
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                <Text>{items[10].name}</Text>
                            </Box>
                            <Spacer />
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                <Text>{items[10].count} アクセス</Text>
                            </Box>
                        </Flex>
                    </ListItem>
                    <ListItem
                        borderTop="1px solid silver"
                        borderLeft="1px solid silver"
                        borderRight="1px solid silver"
                    >
                        <Flex>
                            <Box w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                <Text>12</Text>
                            </Box>
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                <Text>{items[11].name}</Text>
                            </Box>
                            <Spacer />
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                <Text>{items[11].count} アクセス</Text>
                            </Box>
                        </Flex>
                    </ListItem>
                    <ListItem
                        borderTop="1px solid silver"
                        borderLeft="1px solid silver"
                        borderRight="1px solid silver"
                    >
                        <Flex>
                            <Box w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                <Text>13</Text>
                            </Box>
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                <Text>{items[12].name}</Text>
                            </Box>
                            <Spacer />
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                <Text>{items[12].count} アクセス</Text>
                            </Box>
                        </Flex>
                    </ListItem>
                    <ListItem
                        borderTop="1px solid silver"
                        borderLeft="1px solid silver"
                        borderRight="1px solid silver"
                    >
                        <Flex>
                            <Box w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                <Text>14</Text>
                            </Box>
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                <Text>{items[13].name}</Text>
                            </Box>
                            <Spacer />
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                <Text>{items[13].count} アクセス</Text>
                            </Box>
                        </Flex>
                    </ListItem>
                    <ListItem
                        borderTop="1px solid silver"
                        borderLeft="1px solid silver"
                        borderRight="1px solid silver"
                    >
                        <Flex>
                            <Box w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                <Text>15</Text>
                            </Box>
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                <Text>{items[14].name}</Text>
                            </Box>
                            <Spacer />
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                <Text>{items[14].count} アクセス</Text>
                            </Box>
                        </Flex>
                    </ListItem>
                    <ListItem
                        borderTop="1px solid silver"
                        borderLeft="1px solid silver"
                        borderRight="1px solid silver"
                    >
                        <Flex>
                            <Box w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                <Text>16</Text>
                            </Box>
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                <Text>{items[15].name}</Text>
                            </Box>
                            <Spacer />
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                <Text>{items[15].count} アクセス</Text>
                            </Box>
                        </Flex>
                    </ListItem>
                    <ListItem
                        borderTop="1px solid silver"
                        borderLeft="1px solid silver"
                        borderRight="1px solid silver"
                    >
                        <Flex>
                            <Box w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                <Text>17</Text>
                            </Box>
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                <Text>{items[16].name}</Text>
                            </Box>
                            <Spacer />
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                <Text>{items[16].count} アクセス</Text>
                            </Box>
                        </Flex>
                    </ListItem>
                    <ListItem
                        borderTop="1px solid silver"
                        borderLeft="1px solid silver"
                        borderRight="1px solid silver"
                    >
                        <Flex>
                            <Box w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                <Text>18</Text>
                            </Box>
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                <Text>{items[17].name}</Text>
                            </Box>
                            <Spacer />
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                <Text>{items[17].count} アクセス</Text>
                            </Box>
                        </Flex>
                    </ListItem>
                    <ListItem
                        borderTop="1px solid silver"
                        borderLeft="1px solid silver"
                        borderRight="1px solid silver"
                    >
                        <Flex>
                            <Box w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                <Text>19</Text>
                            </Box>
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                <Text>{items[18].name}</Text>
                            </Box>
                            <Spacer />
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                <Text>{items[18].count} アクセス</Text>
                            </Box>
                        </Flex>
                    </ListItem>
                    <ListItem
                        borderTop="1px solid silver"
                        borderLeft="1px solid silver"
                        borderRight="1px solid silver"
                        borderBottom="1px solid silver"
                    >
                        <Flex>
                            <Box w="1.5rem" textAlign="center" borderRight="1px solid silver">
                                <Text>20</Text>
                            </Box>
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingLeft="1rem">
                                <Text>{items[19].name}</Text>
                            </Box>
                            <Spacer />
                            <Box color="gray.500" fontSize="xs" paddingTop="3px" paddingRight="1rem">
                                <Text>{items[19].count} アクセス</Text>
                            </Box>
                        </Flex>
                    </ListItem>
                    {/* You can also use custom icons from react-icons */}
                </List>
            </Box>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    // アクセス情報取得APIの呼び出し
    const apiResponse = await fetch(process.env.WEBAPP_URL + 'api/getAccessInfo')
    const accessInfo = await apiResponse.json()

    // オブジェクト値の詰め替え
    let items: Array<object> = []
    for (let rankingInfoRow of accessInfo.accessRankingInfo) {
        items.push(rankingInfoRow)
    }

    return {
        props: {
            items
        }
    }
}

export default Access

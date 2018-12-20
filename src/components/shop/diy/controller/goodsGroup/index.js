import React, { Component } from "react";
import { Col, Icon, Modal, message, Radio, Form, Select, InputNumber } from "antd";
import styles from "./index.css";
import SeleceGoods from "@/components/public/selectGoods/index";
import { View } from "@/components/flexView";
import Image from "@/components/image/index";
import { formItemLayout } from "@/components/shop/diy/formLayout";

const FormItem = Form.Item;

const RadioGroup = Radio.Group;
const Option = Select.Option;
//
// type Props = {
//     options: {
//         layout_type: number,
//     },
//     data: Array<{
//         id: number,
//         img: {
//             url: string
//         },
//         title: string,
//         price: number,
//         // market_price: number,
//         // desc: string
//     }>,
//     getValues: Function,
//     componentName?: string
// }
//
// type State = {
//     addGoodsVisible: boolean,
//     delectShow: boolean,
//     currentId: number,
// }

export default class Index extends Component {
    state = {
        delectShow: false,
        addGoodsVisible: false,
        currentId: 0
    };
    static defaultProps = {
        componentName: "goods"
    };

    render() {
        const { delectShow, addGoodsVisible, currentId } = this.state;
        const { options, data, getValues } = this.props;
        const { layout_type, source_type, goods_sort } = options;
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="添加方式"
                >
                    <RadioGroup
                        value={source_type}
                        onChange={(e) => {
                            getValues({
                                options: { ...options, ...{ source_type: e.target.value } },
                                data
                            });
                        }}
                    >
                        <Radio value="auto">自动添加</Radio>
                        <Radio value="choose">手动添加</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="显示数量"
                    extra="最多12件，最少1件"
                >
                    <InputNumber max={12} min={1}/>
                    <span> 件</span>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="商品排序"
                >
                    <Select
                        value={goods_sort}
                        style={{ width: 220 }}
                        onChange={async (value) => {
                            const values = {
                                options: { ...options, ...{ goods_sort: value } },
                                data
                            };
                            getValues({
                                options: values.options,
                                data
                                // data: await this.props.refreshGoods(values)
                            });

                        }}
                    >
                        <Option value={1}>销量多到少</Option>
                        <Option value={2}>价格高到低</Option>
                        <Option value={3}>价格低到高</Option>
                    </Select>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="展现形式"
                >
                    <RadioGroup
                        value={layout_type}
                        onChange={(e) => {
                            getValues({
                                options: { ...options, ...{ layout_type: e.target.value } },
                                data
                            });
                        }}
                    >
                        <Radio value={1}>大图</Radio>
                        <Radio value={2}>小图</Radio>
                        <Radio value={4}>列表</Radio>
                        <Radio value={5}>轮播</Radio>
                    </RadioGroup>
                </FormItem>
                {/* <FormItem
                    {...formItemLayout}
                >
                    {
                        data.map((listItem, index) => (
                            <Col
                                key={index}
                                span={6}
                                onMouseEnter={() => {
                                    this.setState({
                                        delectShow: true,
                                        currentId: listItem.id
                                    });
                                }}
                                onMouseLeave={() => {
                                    this.setState({
                                        delectShow: false,
                                        currentId: listItem.id
                                    });
                                }}
                                style={{ position: "relative" }}
                            >
                                <View className={`${styles.goodsCtrlImgItemWarp} ${styles.goodsCtrlImgWarp}`}>
                                    <Image
                                        src={listItem.img}
                                    />
                                </View>
                                {
                                    currentId === listItem.id && delectShow ? <View
                                        className={`${styles.goodsCtrlImgItemWarp} ${styles.goodsCtrlImgDelectWarp}`}>
                                        <a
                                            onClick={() => {
                                                Modal.confirm({
                                                    title: "确认删除?",
                                                    content: (
                                                        <View className={styles.goodsCtrlConfirmDelete}>
                                                            <Image src={listItem.img} />
                                                            <p>{listItem.title}</p>
                                                            <span>￥{listItem.price}</span>
                                                        </View>
                                                    ),
                                                    maskClosable: true,
                                                    okText: "确认",
                                                    okType: "danger",
                                                    cancelText: "取消",
                                                    onOk: () => {
                                                        let _data = data.filter((dataItem) => {
                                                            return dataItem.id !== listItem.id;
                                                        });
                                                        getValues({
                                                            options,
                                                            data: _data
                                                        });
                                                        message.success("已删除", 1);
                                                    }
                                                });
                                            }}
                                        >
                                            删除
                                        </a>
                                    </View> : null
                                }
                            </Col>
                        ))
                    }
                    <View
                        className={`${styles.goodsCtrlImgItemWarp} ${styles.goodsCtrlAddWarp}`}
                        onClick={() => {
                            this.setState({
                                addGoodsVisible: true
                            });
                        }}
                    >
                        <Icon type="plus" />
                        <span>添加</span>
                    </View>
                    <SeleceGoods
                        visible={addGoodsVisible}
                        close={() => {
                            this.setState({ addGoodsVisible: false });
                        }}
                        multiSelect={true}
                        onOk={(goodsList) => {
                            const _data = data;
                            goodsList.map((item) =>
                                _data.push({
                                    id: item.id,
                                    img: item.img,
                                    title: item.title,
                                    price: item.price
                                    // market_price: item.price,
                                    // desc: item.desc ? item.desc : ''
                                })
                            );
                            this.setState({
                                addGoodsVisible: false
                            }, () => {
                                getValues({
                                    options,
                                    data: _data
                                });
                            });
                        }}
                    />
                </FormItem> */}

            </Form>
        );
    }
}

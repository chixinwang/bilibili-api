import {listSpaceItems, removeDynamic} from '../apis/space.js'

/**
 * 移除自己的转发动态
 */
function removeMyDynamicForward() {
    const cookie = 'your cookie';
    const host_mid = 'your host_mid';
    const csrf = 'remove param. please remove a dynamic first. you can get from url';

    // 删除类型(转发动态)
    const removeType = ['DYNAMIC_TYPE_FORWARD'];

    // 每隔一段时间发送一次用户空间动态请求, 避免短时间高qps造成的账号异常
    const timeSpace = 2000;
    const removeTimeStep = timeSpace / 12;
    // 不需要变动
    let offset = '';

    const interval = setInterval(() => {
        listSpaceItems({
            host_mid,
            offset,
            cookie
        }).then(res => {
            if (res.code !== 0) {
                console.log("获取数据失败")
                return;
            }
            let data = res.data.items;
            let time = 0;
            if (data.length === 0) {
                console.log("删除完成");
                clearInterval(interval);
                return;
            }
            data.filter((item, index) => {
                if (index === data.length - 1) {
                    if (offset === item['id_str']) {
                        // 没有新的动态
                        console.log("删除完成");
                        clearInterval(interval);
                        return false;
                    } else {
                        offset = item['id_str']
                    }
                }
                // 只有转发动态会被删除
                return removeType.includes(item['type']);
            }).forEach(item => {
                // 避免短时间高qps造成的账号异常
                time += removeTimeStep;
                setTimeout(() => {
                    const removeItemId = item['id_str'];
                    let authorName;
                    try {
                        authorName = item['orig']['modules']['module_author']['name']
                    } catch (e) {
                        return;
                    }
                    removeDynamic({
                        csrf,
                        cookie,
                        dyn_id_str: removeItemId
                    }).then(data => {
                        if (data.code === 0) {
                            console.log(`删除${authorName}动态成功`)
                        } else {
                            console.log(`删除${authorName}的动态失败, 失败原因: ${data.message}`)
                        }
                    })
                }, time)
            })
        })
    }, timeSpace);
}

export default removeMyDynamicForward;

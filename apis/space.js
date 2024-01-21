// 空间相关api
import request from "../http/request.js";
import {SPACE_PAGE_LIST_URI, REMOVE_DYNAMIC_URI} from "../constant/uri.js";

/**
 * 获取用户空间动态列表
 * @param host_mid 用户uid
 * @param offset 偏移量,上一页的最后一个动态id
 * @param cookie <b>请在空间刷新获取该接口的cookie,不用使用其他接口的cookie</b>
 * @returns {Promise<axios.AxiosResponse<any>>} promise
 */
function listSpaceItems({host_mid, offset, cookie}) {
    return request.get(SPACE_PAGE_LIST_URI, {
        params: {
            host_mid,
            offset
        },
        headers: {
            'Cookie': cookie
        }
    });
}

/**
 * 删除用户指定动态
 * @param csrf <b>尝试删除一个,并且使用该参数即可,不会变动</b>
 * @param cookie @see {@link listSpaceItems}
 * @param dyn_id_str 动态id
 * @returns {Promise<axios.AxiosResponse<any>>} promise
 */
function removeDynamic({csrf, cookie, dyn_id_str}) {
    return request.post(REMOVE_DYNAMIC_URI, {
        dyn_id_str
    }, {
        headers: {
            'Cookie': cookie
        },
        params: {
            csrf
        }
    });
}

export {
    listSpaceItems,
    removeDynamic
}











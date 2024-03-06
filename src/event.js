// Event Handler
export const ev = {
    stage: {
        // 接收的命令
        command: {
            render: 'command:stage:render'
        },
        // 发出的响应
        response: {
            mounted: 'response:stage:mounted',
            loading: 'response:stage:loading',
            loaded: 'response:stage:loaded',
            rendering: 'response:stage:rendering',
            rendered: 'response:stage:rendered'
        },
    },
    selected: {
        command: {
            attach: "command:selected:attach",
            tfMode: "command:selected:tfMode",
            tfSpace: "command:selected:tfSpace"
        },
        response: {
            attach: "response:selected:attach",
            transform: "response:selected:transform"
        },
    }
}

/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.

const CHANGE_MODE     = 'topic/CHANGE_MODE';
const SET_SELECTED_ID = 'topic/SET_SELECTED_ID';
const CREATE          = 'topic/CREATE';
const UPDATE          = 'topic/UPDATE';
const DELETE          = 'topic/DELETE';

export const changeMode = ( mode ) => ({
   type: CHANGE_MODE,
   mode: mode
});

export const setSelectedID = ( id ) => ({
    type: SET_SELECTED_ID,
    selectedID: id
 });

let nextId = 4;
export const create = ( title, body ) => ({
    type: CREATE,
    topic: {
      id: nextId,
      title: title,
      body: body
    },
    selectedID: nextId++
});

export const update = ( id, title, body ) => ({
    type: UPDATE,
    topic: {
      id: id,
      title: title,
      body: body
    },
    selectedID: id
});

export const destroy = ( id ) => ({
    type: DELETE,
    selectedID: id
});

/* 초기 상태 선언 */
const initState = {
    selectedID: null,
    mode: 'WELCOME',
    list: [ 
        { id: 1, title: 'html', body: 'html is ...' },
        { id: 2, title: 'css', body: 'css is ...' },
        { id: 3, title: 'javascript', body: 'javascript is ...' },
    ]
};


/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function topicReducer(state = initState, action) {
    switch (action.type) {
        case CHANGE_MODE:
            return {
                ...state,
                mode: action.mode
            }
        case SET_SELECTED_ID:
            return {
                ...state,
                selectedID: action.selectedID,
            }
        case CREATE:
            return {
                ...state,
                list: state.list.concat(action.topic),
                selectedID: action.selectedID,
                mode: 'READ'
            };
        case UPDATE:
            const newTopics = [...state.list];
            for ( let i=0; i< newTopics.length; i++ ) {
                if (newTopics[ i ].id === action.topic.id) {
                newTopics[ i ] = action.topic;
                break;
                }
            }
            return {
                ...state,
                list: newTopics,
                selectedID: action.selectedID,
                mode: 'READ'
            };
        case DELETE:
            const newTopics2 = [];
            for ( let i = 0; i < state.list.length; i++ ) {
                if ( state.list[ i ].id !== action.selectedID) {
                newTopics2.push(state.list[ i ]);
                }
            }
            return {
                ...state,
                list: newTopics2,
                selectedID: action.selectedID,
                mode: 'WELCOME'
            };
        default:
            return state;
    }
}
export const setTableRender = (payload) => ({
	type: 'TABLE_RENDER_SET',
	payload,
});

export const TableRenderError = () => ({ type: 'TABLE_RENDER_ERROR' });
export const loadingTableRender = () => ({ type: 'TABLE_RENDER_LOADING' });
export const finishTableRender = () => ({ type: 'TABLE_RENDER_FINISH' });

export const loadingOnPromisse = () => ({ type: 'ON_PROMISSE_LOADING' });
export const finishOnPromisse = () => ({ type: 'ON_PROMISSE_FINISH' });

export const fetchTableRender = (callBack) => async (dispatch) => {
	dispatch(loadingOnPromisse());
	dispatch(loadingTableRender());
	try {
		let result = await callBack();
		// await delay(1000);

		dispatch(finishOnPromisse());
		dispatch(finishTableRender());
		dispatch(setTableRender(result));
	} catch (err) {
		dispatch(TableRenderError());
	}
};


const delay = ms => new Promise(res => setTimeout(res, ms));

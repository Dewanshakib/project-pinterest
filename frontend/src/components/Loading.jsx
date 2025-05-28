export const LoadingBtnAuth = () => {
    return <div className="inline-block w-5 h-5 animate-spin border-t-2 border-r-transparent border-white rounded-full"></div>
}

export const LoadingBtnMain = () => {
    return <div className="flex items-center justify-center min-h-screen w-full">
        <div className="animate-spin rounded-full h-14 w-14 border border-t-4 border-red-500"></div>
    </div>
}

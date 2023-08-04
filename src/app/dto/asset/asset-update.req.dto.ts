export interface AssetUpdateReqDto {
    id: number;
    assetTypeId: number;
    userId: number;
    assetStatusId: number;
	fileName : string;
	fileExt : string;
}
//-----Types.File-----
export interface ListBucketDto {
	Name: string;
	CreationDate: string;
	[key: string]: any;
}

export function deserializeListBucketDto(json: string): ListBucketDto {
	const data = JSON.parse(json) as ListBucketDto;
	initListBucketDto(data);
	return data;
}

export function initListBucketDto(_data: ListBucketDto) {
	return _data;
}

export function serializeListBucketDto(_data: ListBucketDto | undefined) {
	if (_data) {
		_data = prepareSerializeListBucketDto(_data as ListBucketDto);
	}
	return JSON.stringify(_data);
}

export function prepareSerializeListBucketDto(_data: ListBucketDto): ListBucketDto {
	const data: Record<string, any> = { ..._data };
	return data as ListBucketDto;
}

export interface ListObjectDto {
	Key: string;
	LastModified: string;
	ETag: string;
	Size: number;
	StorageClass: string;
	[key: string]: any;
}

export function deserializeListObjectDto(json: string): ListObjectDto {
	const data = JSON.parse(json) as ListObjectDto;
	initListObjectDto(data);
	return data;
}

export function initListObjectDto(_data: ListObjectDto) {
	return _data;
}

export function serializeListObjectDto(_data: ListObjectDto | undefined) {
	if (_data) {
		_data = prepareSerializeListObjectDto(_data as ListObjectDto);
	}
	return JSON.stringify(_data);
}

export function prepareSerializeListObjectDto(_data: ListObjectDto): ListObjectDto {
	const data: Record<string, any> = { ..._data };
	return data as ListObjectDto;
}
import type { AxiosError } from 'axios';

export class ApiException extends Error {
	message: string;
	status: number;
	response: string;
	headers: { [key: string]: any };
	result: any;

	constructor(
		message: string,
		status: number,
		response: string,
		headers: { [key: string]: any },
		result: any
	) {
		super();

		this.message = message;
		this.status = status;
		this.response = response;
		this.headers = headers;
		this.result = result;
	}

	protected isApiException = true;

	static isApiException(obj: any): obj is ApiException {
		return obj.isApiException === true;
	}
}

export function throwException(
	message: string,
	status: number,
	response: string,
	headers: { [key: string]: any },
	result?: any
): any {
	if (result !== null && result !== undefined) throw result;
	else throw new ApiException(message, status, response, headers, null);
}

export function isAxiosError(obj: any | undefined): obj is AxiosError {
	return obj && obj.isAxiosError === true;
}

//-----/Types.File-----

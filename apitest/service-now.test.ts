import { expect, test } from "@playwright/test";

test.describe.serial("Create and get new Incident", () => {
  let _number: number;
  const short_description_value = "require ms office 365";
  let _sys_id: String;

  test("Create an Incident", async ({ request, baseURL }) => {
    const _response = await request.post(`${baseURL}`, {
      data: {
        short_description: short_description_value,
        category: "hardware",
      },
      headers: {
        Accept: "application/json",
      },
    });
    expect(_response.status()).toBe(201);
    expect(_response.ok()).toBeTruthy;
    const res = await _response.json();
    _number = res.result.task_effective_number;
    _sys_id = res.result.sys_id;
    // output as xml
  });

  // Get
  test("Get an Incident", async ({ request, baseURL }) => {
    const _response = await request.get(`${baseURL}`, {
      params: {
        task_effective_number: _number,
        sysparm_fields: "short_description,category",
      },
    });
    expect(_response.status()).toBe(200);
    expect(await _response.json()).toMatchObject({
      result: [
        { short_description: short_description_value, category: "hardware" },
      ],
    });
  });

  // Update
  test("Update an Incident", async ({ request, baseURL }) => {
    console.log(_number);
    const _response = await request.put(`${baseURL}/${_sys_id}`, {
      data: {
        short_description: "Very boring tutorial",
        category: "software",
      },
    });
    console.log(await _response.json());
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy;
  });

  // Get updated
  test("Get updated Incident", async ({ request, baseURL }) => {
    const _response = await request.get(`${baseURL}`, {
      params: {
        task_effective_number: _number,
        sysparm_fields: "short_description,category",
      },
    });
    expect(_response.status()).toBe(200);
    expect(await _response.json()).toMatchObject({
      result: [
        { short_description: "Very boring tutorial", category: "software" },
      ],
    });
  });

  // Delete
  test("Delete an Incident", async ({ request, baseURL }) => {
    console.log(_number);
    const _response = await request.delete(`${baseURL}/${_sys_id}`, {});
    expect(_response.status()).toBe(204);
    expect(_response.ok()).toBeTruthy;
  });
});

import { z } from "zod";

import { router, publicProcedure } from "../trpc";

import axios from "axios";

export const exampleRouter = router({
  sendOtp: publicProcedure
    .input(z.object({ phoneNumber: z.string() }))
    .mutation(async ({ input }) => {
      const response = await axios
        .request({
          method: "POST",
          url: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/sendVerificationCode",
          params: { key: "AIzaSyDwjfEeparokD7sXPVQli9NsTuhT6fJ6iA" },
          headers: {
            "Content-Type": "application/json",
            "x-ios-bundle-identifier": "AlexisBarreyat.BeReal",
          },
          data: {
            phoneNumber: input.phoneNumber,
            iosReceipt:
              "AEFDNu9QZBdycrEZ8bM_2-Ei5kn6XNrxHplCLx2HYOoJAWx-uSYzMldf66-gI1vOzqxfuT4uJeMXdreGJP5V1pNen_IKJVED3EdKl0ldUyYJflW5rDVjaQiXpN0Zu2BNc1c",
          },
        })

        return response.data;
    }),
  verifyOtp: publicProcedure
    .input(z.object({ sessionInfo: z.string(), otpCode: z.string() }))
    .mutation(async ({ input }) => {
      const response = await axios
      .request({
        method: "POST",
        url: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPhoneNumber",
        params: { key: "AIzaSyDwjfEeparokD7sXPVQli9NsTuhT6fJ6iA" },
        headers: {
          "Content-Type": "application/json",
          "x-ios-bundle-identifier": "AlexisBarreyat.BeReal",
        },
        data: {
          sessionInfo: input.sessionInfo,
          code: input.otpCode,
          operation: "SIGN_UP_OR_IN",
        },
      })

      return response.data;
    }),
  refreshToken: publicProcedure
    .input(z.object({ refreshToken: z.string() }))
    .mutation(async ({ input }) => {
      const response = await axios
      .request({
        method: "POST",
        url: "https://securetoken.googleapis.com/v1/token",
        params: { key: "AIzaSyDwjfEeparokD7sXPVQli9NsTuhT6fJ6iA" },
        headers: {
          "Content-Type": "application/json",
          "x-ios-bundle-identifier": "AlexisBarreyat.BeReal",
        },
        data: {
          refresh_token: input.refreshToken,
          grant_type: "refresh_token",
        },
      })

      return response.data;
    }),
  getMemories: publicProcedure
    .input(z.object({ token: z.string().nullish() }))
    .query(async ({ input }) => {

      if(!input.token) return "";

      const response = await axios.request({
        method: 'GET',
        url: 'https://mobile.bereal.com/api/feeds/memories',
        headers: {Authorization: 'Bearer '+input.token},
      })

      return response.data;
    }),
});

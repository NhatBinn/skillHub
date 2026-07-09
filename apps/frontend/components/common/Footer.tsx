import { Container } from "../layout/container";

function Footer() {
  return (
    <footer>
      <Container>
        <div className="border-t border-[#E2E8F0] mt-5 pt-5 mb-4 flex flex-row justify-between items-center text-[12px] text-[#94A3B8]">
          <span>© 2026 SkillHub</span>
          <span>Make by HoangNhat</span>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;

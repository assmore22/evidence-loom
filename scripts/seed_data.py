from pathlib import Path
from gltest_cli.config.general import get_general_config
from gltest_cli.config.user import load_user_config
from gltest import get_contract_factory, get_default_account
ROOT = Path(__file__).resolve().parents[1]
ADDR = "0xF66B65Ed26bbA04688C89e2ccF854Eb257EF55aA"
W = "https://en.wikipedia.org/api/rest_v1/page/summary/"
cfg = load_user_config(str(ROOT / "gltest.config.yaml")); get_general_config().user_config = cfg
factory = get_contract_factory(contract_file_path=str(ROOT / "contracts" / "weave.py"))
c = factory.build_contract(ADDR, account=get_default_account())
T = [
    ("Water is composed of hydrogen and oxygen.", W + "Water", True),
    ("Humans can breathe unaided in the vacuum of outer space.", W + "Outer_space", True),
    ("Mount Everest is the highest mountain on Earth above sea level.", W + "Mount_Everest", True),
    ("Humanity will establish a permanent colony on Mars within the decade.", W + "Colonization_of_Mars", False),
]
def main():
    if c.get_thread_count().call() == 0:
        for (cl, u, _) in T:
            c.weave_thread(args=[cl, u]).transact(); print("woven:", cl[:40])
    for i in range(c.get_thread_count().call()):
        do = T[i][2] if i < len(T) else False
        t = c.get_thread(args=[i]).call()
        if do and int(t["status"]) == 0:
            print("assessing (AI):", t["claim"][:36])
            try: c.assess_thread(args=[i]).transact()
            except Exception as e: print("  ->", e)
    print("stats:", c.get_stats().call())
    for i in range(c.get_thread_count().call()):
        t = c.get_thread(args=[i]).call()
        print(i, ["PENDING", "UPHELD", "FRAYED"][int(t["status"])], "|", t["claim"][:40])
if __name__ == "__main__":
    main()
